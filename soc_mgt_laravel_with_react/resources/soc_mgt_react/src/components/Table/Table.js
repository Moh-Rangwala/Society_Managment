import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./table.css";

const CustomTable = (props) => {
  return (
    <div
      style={{
        height: props.height ? props.height : 500,
        width: props.width ? props.width : "100%",
      }}
    >
      <DataGrid
        rows={props.rows}
        rowHeight={props.rowHeight}
        columns={props.columns}
        pageSize={props.pageSize}
        rowsPerPageOptions={props.rowsPerPageOptions}
        //   disableSelectionOnClick
      />
    </div>
  );
};

export default CustomTable;
