// eventHandlers.js

export const handleEditClick = (id, setRowModesModel) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
};

export const handleSaveClick = (id, setRowModesModel) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
};

export const handleDeleteClick = (id, setRows) => () => {
    setRows(rows.filter((row) => row.id !== id));
};

export const handleCancelClick = (id, setRowModesModel, setRows) => () => {
    setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
    }
};
