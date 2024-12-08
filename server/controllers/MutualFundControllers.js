import MutualFund from "../models/MutualFundModel.js";
import User from "../models/UserModel.js";
import axios from "axios";

export const OneTimeInvestMent = async (req, res) => {
  const {
    userid,
    fundName,
    units,
    schemetype,
    investedAmount,
    nav,
    status,
    code,
    frequency,
    sipdate,
  } = req.body;

  const existingFunds = await MutualFund.findOne({
    userid: userid,
    fundName: fundName,
  });

  // const previousNav = existingFunds.nav;
  // const currentNav = parseFloat(nav);
  // const sipAmount = parseInt(investedAmount);
  // const unitsPurchased = sipAmount / currentNav;
  // console.log(previousNav);
  // console.log(currentNav);
  // console.log(sipAmount);
  // console.log(unitsPurchased);

  try {
    if (existingFunds) {
      const previousNav = existingFunds.nav;
      const currentNav = parseFloat(nav);
      const sipAmount = parseInt(investedAmount);
      const unitsPurchased = sipAmount / currentNav;

      existingFunds.units = parseFloat(existingFunds.units) + unitsPurchased;
      existingFunds.investedAmount =
        parseInt(existingFunds.investedAmount) + sipAmount;
      existingFunds.nav = currentNav;
      existingFunds.status = status;
      existingFunds.sipdate = sipdate;

      console.log("hello");

      await existingFunds.save();
    } else {
      const newFund = new MutualFund({
        userid,
        fundName,
        units,
        schemetype,
        investedAmount,
        nav,
        status,
        code,
        frequency,
        sipdate,
      });

      await newFund.save();
    }

    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const totalInvestment = investedAmount;
    if (user.walletbalance < totalInvestment) {
      return res.status(400).send("Insufficient funds");
    }

    user.walletbalance -= totalInvestment;
    await user.save();

    res.status(200).send(`${fundName} is purchased`);
  } catch (e) {
    res.status(500).send("Something went wrong....");
  }
};

export const GetAllMF = async (req, res) => {
  const userid = req.body.userid;

  const List = [
    {
      code: 119091,
      name: "hdfc-liquid-fund-direct-growth",
    },
    {
      code: 119800,
      name: "sbi-premier-liquid-fund-direct-growth",
    },
    {
      code: 119609,
      name: "sbi-magnum-balanced-fund-direct-growth",
    },
    {
      code: 100119,
      name: "hdfc-growth-fund-direct-growth",
    },
    {
      code: 100047,
      name: "birla-sun-life-cash-plus-direct-growth",
    },
    {
      code: 103340,
      name: "icici-prudential-liquid-fund-direct-plan-growth",
    },
    {
      code: 119766,
      name: "kotak-liquid-scheme-direct-growth",
    },
    {
      code: 134427,
      name: "uti-liquid-cash-plan-direct-growth",
    },
    {
      code: 122639,
      name: "parag-parikh-long-term-value-fund-direct-growth",
    },
  ];

  console.log(userid);

  let MarketPrices = [];

  try {
    const result = await MutualFund.find({ userid: userid });

    for (let mf of result) {
      console.log(mf.fundName);

      let currentFundName = List.filter((m, i) => m.code === mf.code);

      const response = await axios.get(
        `https://my-stock-api.onrender.com/get-mutual-fund-history/${mf.code}`
      );

      // console.log(response.data);

      let firstPair = Object.entries(response.data.data)[0];

      console.log(firstPair);

      MarketPrices.push({ ...firstPair[1], link: currentFundName[0].name });
    }

    const FinalData = result.map((mf, i) => {
      return {
        ...mf,
        marketPrice: MarketPrices[i].nav,
        link: MarketPrices[i].link,
      };
    });

    const data = FinalData.map((mf, i) => {
      const { _doc, marketPrice, link, ...others } = mf;

      return { ..._doc, marketPrice: parseFloat(marketPrice), link };
    });

    res.status(200).send(data);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
};

export const soldMutualFund = async (req, res) => {
  const { userid, fundName, units, marketPrice, status, code } = req.body;

  try {
    const user = await User.findById(userid);

    const ExistMF = await MutualFund.findOne({
      userid: userid,
      fundName: fundName,
      code: code,
      status: "Active",
    });

    if (!ExistMF) {
      return res.status(401).send("You are not invested in this fund yet...");
    }

    if (ExistMF.units < units) {
      return res.status(401).send(`You have only ${ExistMF.units} only`);
    }

    ExistMF.units = ExistMF.units - units;
    ExistMF.investedAmount = ExistMF.investedAmount - units * marketPrice;

    await ExistMF.save();

    user.walletbalance = user.walletbalance + units * marketPrice;

    await user.save();

    // const SoldMF = new MutualFund({
    //   userid,
    //   fundName,
    //   units,
    //   marketPrice,
    //   status,
    //   code,
    // });

    // await SoldMF.save();

    res.status(200).send(`${units} of ${fundName} are sold successfully `);
  } catch (e) {
    res.status(500).send("Something went wrong...");
  }
};
