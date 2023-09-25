import { ShopLayout } from "@/components/layouts";
import { NextLink } from "@/constants";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field     : "id",
    headerName: "ID",
    width     : 100,
  },
  {
    field     : "fullname",
    headerName: "Nombre Completo",
    width     : 300,
  },
  {
    field      : "paid",
    headerName : "Pagada",
    description: "Muestra informacion si esta pagadala orden o no",
    width      : 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No Pagada" variant="outlined" />
      );
    },
  },
  {
    field     : "orden",
    headerName: "Ver orden",
    width     : 200,
    sortable  : false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} legacyBehavior passHref>
          <Link underline="always">Orden</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: "Ociel Gonzalez" },
  { id: 2, paid: false, fullname: "Samed Gonzalez" },
  { id: 3, paid: true, fullname: "Carlos Gonzalez" },
  { id: 4, paid: false, fullname: "Pelra Gutierrez" },
  { id: 5, paid: true, fullname: "Angel Salazar" },
  { id: 6, paid: false, fullname: "Oliver Pabloff" },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title="Historial de Ordenes"
      pageDescription="HIstorial de Ordenes del Cliente"
    >
      <Typography variant="h1" component="h1">
        Historial de Ordenes
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={rows}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[10, 25, 100]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
