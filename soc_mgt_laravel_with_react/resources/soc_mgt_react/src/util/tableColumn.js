const columnsData = {
  manager: (edit, chat) => [
    { field: "id", headerName: "ID", 
    width: 60 
},
    { field: "fname", headerName: "First Name", width: 100 },
    {
      field: "lname",
      headerName: "Last name",
    //   width: 100,
    },
    {
      field: "address",
      headerName: "Home Address",
      width: 120,
    },
    {
      field: "contact",
      headerName: "Contact",
      //   width: 110,
    },
    {
      field: "dob",
      headerName: "B-day",
      //   description: 'This column has a value getter and is not sortable.',
      //   sortable: false,
      //   width: 160,
      //   valueGetter: (params) =>
      //     `${params.getValue(params.id, 'firstName') || ''} ${
      //       params.getValue(params.id, 'lastName') || ''
      //     }`,
    },
    {
      field: "email",
      headerName: "Email",
        width: 110,
    },
    {
      field: "license",
      headerName: "License ID",
      //   width: 110,
    },
    {
      field: "role",
      headerName: "Role",
      //   width: 110,
    },
    {
      field: "edit",
      headerName: "Edit",
      //   width: 150,
      renderCell: edit,
      // disableClickEventBubbling: true,
    },
  ],
  buildings: (edit, chat) => [
    { field: "id", headerName: "ID", width: 60 },
    { field: "bldgnum", headerName: "Building Num", width: 120 },
    {
      field: "aptnum",
      headerName: "Apartment Num",
      width: 140,
    },
    {
      field: "owner",
      headerName: "Owner Name",
      width: 185,
    },
    {
      field: "owner_id",
      headerName: "Owner Id",
        width: 175,
    },
    {
      field: "edit",
      headerName: "Edit",
      //   width: 150,
      renderCell: edit,
      // disableClickEventBubbling: true,
    },
  ],
  services: (edit, chat) => [
    { field: "id", headerName: "ID", width: 60 },
    { field: "service_name", headerName: "Service Name", width: 200 },
    {
      field: "category",
      headerName: "Category",
      width: 130,
    },
    {
      field: "start_time",
      headerName: "Start Time",
      width: 120,
    },
    {
      field: "end_time",
      headerName: "End Time",
      //   width: 110,
    },
    {
      field: "edit",
      headerName: "Edit",
      //   width: 150,
      renderCell: edit,
      // disableClickEventBubbling: true,
    },
  ],
  service_req: (edit, chat) => [
    { field: "id", headerName: "ID", width: 60 },
    { field: "service_name", headerName: "Service Name", width: 200 },
    {
      field: "service_id",
      headerName: "Service ID",
      width: 100,
    },
    {
      field: "owner_id",
      headerName: "Owner ID",
      width: 120,
    },
    {
      field: "flat_detail",
      headerName: "Flat Details",
      //   width: 110,
    },
    {
      field: "approve",
      headerName: "Approval",
      valueFormatter: (params) => {
        const valueFormatted = params.value == 0 ? "Not Approved" : "Approved";
        return `${valueFormatted}`;
      },

        width: 110,
    },
    {
      field: "edit",
      headerName: "Edit",
      //   width: 150,
      renderCell: edit,
      // disableClickEventBubbling: true,
    },
  ],
  resident: (edit, chat) => [
    { field: "id", headerName: "ID", width: 60 },
    { field: "fname", headerName: "First Name", width: 100 },
    {
      field: "lname",
      headerName: "Last name",
      width: 100,
    },
    {
      field: "bldg",
      headerName: "Building",
      width: 80,
    },
    {
      field: "apt",
      headerName: "Apartment",
      width: 100,
    },
    {
      field: "contact",
      headerName: "Contact",
        width: 110,
    },
    {
      field: "dob",
      headerName: "B-day",
    },
    {
      field: "email",
      headerName: "Email",
        width: 130,
    },
    {
      field: "license",
      headerName: "License ID",
      //   width: 110,
    },
    {
      field: "role",
      headerName: "Role",
      //   width: 110,
    },
    {
      field: "edit",
      headerName: "Edit",
      //   width: 150,
      renderCell: edit,
      // disableClickEventBubbling: true,
    },
    {
      field: "chat",
      headerName: "Chat Resident",
      //   width: 150,
      renderCell: chat,
      // disableClickEventBubbling: true,
    },
  ],
  visitor: (edit, chat) => [
    { field: "id", headerName: "ID", width: 60 },
    { field: "fname", headerName: "First Name", width: 100 },
    {
      field: "lname",
      headerName: "Last name",
      width: 100,
    },
    {
      field: "address",
      headerName: "Home Address",
      width: 150,
    },
    {
      field: "contact",
      headerName: "Contact",
      //   width: 110,
    },
    {
      field: "dob",
      headerName: "B-day",
    },
    {
      field: "email",
      headerName: "Email",
        width: 140,
    },
    {
      field: "license",
      headerName: "License ID",
      //   width: 110,
    },
    {
      field: "role",
      headerName: "Role",
      //   width: 110,
    },
    {
      field: "edit",
      headerName: "Edit",
      //   width: 150,
      renderCell: edit,
      // disableClickEventBubbling: true,
    },
    {
      field: "chat",
      headerName: "Chat Visitor",
      //   width: 150,
      renderCell: chat,
      // disableClickEventBubbling: true,
    },
  ],
  garden: (edit, chat) => [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Garden Name", width: 200 },
    {
      field: "start_time",
      headerName: "Start Time",
      width: 100,
    },
    {
      field: "end_time",
      headerName: "End Time",
      width: 120,
    },
    {
      field: "type",
      headerName: "Type",
      //   width: 110,
    },
    {
      field: "edit",
      headerName: "Edit",
      //   width: 150,
      renderCell: edit,
      // disableClickEventBubbling: true,
    },
  ],
  pool: (edit, chat) => [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Pool Name", width: 200 },
    {
      field: "start_time",
      headerName: "Start Time",
      width: 100,
    },
    {
      field: "end_time",
      headerName: "End Time",
      width: 120,
    },
    {
      field: "type",
      headerName: "Type",
      //   width: 110,
    },
    {
      field: "edit",
      headerName: "Edit",
      //   width: 150,
      renderCell: edit,
      // disableClickEventBubbling: true,
    },
  ],
  servicesResident: (edit) => [
    { field: "id", headerName: "ID", width: 60 },
    { field: "service_name", headerName: "Service Name", width: 180 },
    {
      field: "category",
      headerName: "Category",
      width: 130,
    },
    {
      field: "start_time",
      headerName: "Start Time",
      width: 120,
    },
    {
      field: "end_time",
      headerName: "End Time",
      //   width: 110,
    },
    {
      field: "book",
      headerName: "Book Service",
        width: 130,
      renderCell: edit,
      // disableClickEventBubbling: true,
    },
  ],
  service_req_resident: [
    { field: "id", headerName: "ID", width: 60 },
    { field: "service_name", headerName: "Service Name", width: 180 },
    {
      field: "service_id",
      headerName: "Service ID",
      width: 100,
    },
    {
      field: "owner_id",
      headerName: "Owner ID",
      width: 120,
    },
    {
      field: "flat_detail",
      headerName: "Flat Details",
      //   width: 110,
    },
    {
      field: "approve",
      headerName: "Approval",
      valueFormatter: (params) => {
        const valueFormatted = params.value == 0 ? "Not Approved" : "Approved";
        return `${valueFormatted}`;
      },

        width: 110,
    },
  ],
  visitorRequestVisitor: (edit) => [
    { field: "id", headerName: "ID", width: 60 },
    { field: "visitor_name", headerName: "Given Name", width: 150 },
    {
      field: "bldg",
      headerName: "Building",
      width: 100,
    },
    {
      field: "apt",
      headerName: "Apartment",
      width: 120,
    },
    {
      field: "visit_reason",
      headerName: "Visit Reason",
        width: 140,
    },
    {
      field: "approval",
      headerName: "Request Approval",
        width: 140,
      valueFormatter: (params) => {
        const valueFormatted = params.value == 0 ? "Pending" : "Approved";
        return `${valueFormatted}`;
      },
      // disableClickEventBubbling: true,
    },
    {
      field: "owner_id",
      headerName: "Owner ID",
        width: 140,
      // disableClickEventBubbling: true,
    },
    {
      field: "checked_out",
      headerName: "Check Out Status",
        width: 140,
      valueFormatter: (params) => {
        const valueFormatted = params.value == 0 ? "Pending" : "Checked Out";
        return `${valueFormatted}`;
      },
      // disableClickEventBubbling: true,
    },
    {
      field: "checkOutButton",
      headerName: "Check Out",
        width: 130,
      renderCell: edit,
      // disableClickEventBubbling: true,
    },
  ],
  residentRequestVisitor: (edit) => [
    { field: "id", headerName: "ID", width: 60 },
    { field: "visitor_name", headerName: "Given Name", width: 150 },
    {
      field: "visit_reason",
      headerName: "Visit Reason",
        width: 150,
    },
    {
      field: "approval",
      headerName: "Approval Status",
        width: 150,
      valueFormatter: (params) => {
        const valueFormatted = params.value == 0 ? "Pending" : "Approved";
        return `${valueFormatted}`;
      },
      // disableClickEventBubbling: true,
    },
    {
      field: "owner_id",
      headerName: "Owner ID",
      //   width: 150,
      // disableClickEventBubbling: true,
    },
    {
      field: "checked_out",
      headerName: "Visitor Check Out Status",
        width: 200,
      valueFormatter: (params) => {
        const valueFormatted = params.value == 0 ? "Pending" : "Checked Out";
        return `${valueFormatted}`;
      },
      // disableClickEventBubbling: true,
    },
    {
      field: "approveReqButton",
      headerName: "Approve Request",
        width: 150,
      renderCell: edit,
      // disableClickEventBubbling: true,
    },
  ],
  residentVisitorHistory: [
    { field: "id", headerName: "ID", width: 60 },
    { field: "visitor_name", headerName: "Given Name", width: 150 },
    {
      field: "visit_reason",
      headerName: "Visit Reason",
        width: 170,
    },
    {
      field: "owner_id",
      headerName: "Owner ID",
        width: 130,
      // disableClickEventBubbling: true,
    },
    {
      field: "checked_out",
      headerName: "Visitor Check Out Status",
        width: 190,
      valueFormatter: (params) => {
        const valueFormatted = params.value == 0 ? "Pending" : "Checked Out";
        return `${valueFormatted}`;
      },
      // disableClickEventBubbling: true,
    },
  ],
};

export default columnsData;
