import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { tablet, mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import { GetMutualFund } from "../apicalls/MutualFundCalls";

const Container = styled.div`
  ${tablet({ maxWidth: "70%" })};
  ${mobile({ maxWidth: "30%" })};
`;

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "scheme_name", headerName: "Fund name", width: 250 },
  { field: "Fund_size", headerName: "AUM", width: 130 },
  {
    field: "one_year_return",
    headerName: "1Y CAGR",
    width: 130,
  },
  {
    field: "three_year_return",
    headerName: "3Y CAGR",
    width: 130,
  },
  {
    field: "five_year_return",
    headerName: "5Y CAGR",
    width: 130,
  },
  {
    field: "All_return",
    headerName: "Till date CAGR",
    width: 130,
  },
  {
    field: "link",
    headerName: "Link",
  },
  { field: "code", headerName: "Code" },
];

export default function MutualFundTable() {
  const { MFList } = useSelector((state) => state.mutualFund);

  const Rows = MFList?.map((mf, i) => {
    return {
      id: i + 1,
      scheme_name: mf.scheme_name,
      Fund_size: mf.fundamentals?.[3]["Fund size"],
      one_year_return: mf.returns[0]?.one_year_return,
      three_year_return: mf.returns[1]?.three_year_return,
      five_year_return: mf.returns[2]?.five_year_return,
      All_return: mf.returns[3]?.All_return,
      link: mf.link,
      code: mf.code,
    };
  });

  console.log(Rows);

  const Navigate = useNavigate();

  const handleEvent = (params, event, details) => {
    Navigate(`/mutualFund/${params.row.link}/${params.row.code}`);
  };

  return (
    <Container style={{ minHeight: 400 }}>
      <DataGrid
        onRowClick={handleEvent}
        rows={Rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              link: false,
              code: false,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </Container>
  );
}
