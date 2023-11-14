export const paginationOptions = {
	rowsPerPageText: 'Filas por página',
	rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}

const customStyles = {
  headRow: {
    style: {
      fontSize: "Arial",
      borderBottom: 'solid 1px #ededed',
    },
  },
  headCells: {
    style: {
      color: '#202124',
      fontSize: '16px',
    },
  },
  rows: {
    style:{
      fontSize: '14px',
      fontFamily: "Arial"
    },
    highlightOnHoverStyle: {
      borderBottomColor: '#FFFFFF',
      borderRadius: '5px',
      outline: '1px solid #FFFFFF',
    },
  },
  pagination: {
    style: {
      border: 'none',
    },
  },
};

export default customStyles