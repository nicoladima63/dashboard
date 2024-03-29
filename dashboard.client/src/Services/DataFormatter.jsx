import services from './Services';
class DataFormatter {

    static async getColumns( tablename) {
        //console.log(tablename)
        const fields = await services.getTableFields(tablename); // Chiamata al servizio per ottenere i nomi delle colonne
        //console.log(fields.propertyNames)
        const columns = fields.propertyNames.map(fieldName => ({
            field: fieldName,
            headerName: fieldName, // Assumendo che tu abbia una funzione 'capitalize' per formattare i nomi delle colonne
            width: 180,
            editable: true
        }));
        //console.log(columns)
        columns.push({
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        })
        return columns;
    }

    static getNomi(data) {
        if (data === null || data === undefined) {
            console.error("Data is null or undefined");
            return []; // o qualsiasi altro valore predefinito che preferisci
        }

        if (data.length === 0) {
            console.warn("Data is empty");
            return []; // o qualsiasi altro valore predefinito che preferisci
        }

        const formattedData = data.map(m => m.nome);
        return formattedData;
    }


    static Ordina(bisogni, tipoOrdinamento = 'alfabetico') {
        // Formattare i nomi dei bisogni
        let nomi = bisogni.map(bisogno => bisogno.nome);

        switch (tipoOrdinamento) {
            case 'alfabetico':
                // Ordinare i nomi dei bisogni in ordine alfabetico
                nomi = nomi.sort();
                break;
            case 'importanza':
                // Ordinare i nomi dei bisogni per importanza
                nomi = bisogni.sort((a, b) => a.importanza - b.importanza).map(bisogno => bisogno.nome);
                break;
            case 'tolleranza':
                // Ordinare i nomi dei bisogni per tolleranza
                nomi = bisogni.sort((a, b) => a.tolleranza - b.tolleranza).map(bisogno => bisogno.nome);
                break;
            case 'dataUltimaSoddisfazione':
                // Ordinare i nomi dei bisogni per data ultima soddisfazione
                nomi = bisogni.sort((a, b) => new Date(b.dataUltimaSoddisfazione) - new Date(a.dataUltimaSoddisfazione)).map(bisogno => bisogno.nome);
                break;
            default:
                // Se il tipo di ordinamento non è valido, ordinare in modo alfabetico
                nomi = nomi.sort();
        }

        return nomi;
    }


    static getColumnsName(tableFields) {
        const columns = tableFields.map(fieldName => ({
            field: fieldName,
            headerName: fieldName, 
            width: 180,
            editable: fieldName === 'id' ? false : true,
        }));
        return columns; // Restituisce le colonne formattata
    }
}





export default DataFormatter;