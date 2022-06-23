import { Box, Pagination } from "@mui/material";
import React from "react";


interface Props {
  handlePageChange?: (e: any, page: number) => void,
  totalProducts?: number
  pageSize?: number | null
  currentPage?: number | null
}

const AppPagination: React.FC<Props> = ({ handlePageChange, totalProducts, pageSize, currentPage }) => {
 const totalPages = Math.ceil((totalProducts as number) / (pageSize as number))
  return (
    <Box
      justifyContent={"center"}
      alignItems="center"
      display="flex"
      sx={{ margin: "20px 0px" }}
    >
      <Pagination  onChange={handlePageChange} count={totalPages} />
    </Box>
  );
};

export default AppPagination
