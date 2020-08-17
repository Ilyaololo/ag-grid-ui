import React, { useCallback, useRef, useMemo } from 'react';
import useRequest from 'axios-hooks';

import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { ColDef, ColGroupDef, ColumnApi, GridApi, GridReadyEvent, Module, ProcessRowGroupForExportParams } from "@ag-grid-community/core";
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

const columnDefs: Array<ColDef | ColGroupDef> = [
  {
    field: 'loc_name',
    enableRowGroup: true,
    enablePivot: true,
    rowGroup: true,
    hide: true
  },
  {
    field: 'group_name',
    enableRowGroup: true,
    filter: false,
    enablePivot: true,
    rowGroup: true,
    hide: true
  },
  {
    field: 'name',
    enableRowGroup: true,
    filter: false,
    enablePivot: true,
    rowGroup: true,
    hide: true
  },
  {
    field: 'employee_number',
    filter: false,
  },
  {
    field: 'name_manager',
    filter: false,
  },
  {
    field: 'employee_number_manager',
    filter: false,
  },
  {
    field: 'block',
    pivot: true,
    hide: true,
    enablePivot: true,
  },
  {
    field: 'aht_1',
    filter: false,
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'aht_2',
    filter: false,
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'aht_3',
    filter: false,
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'aht_4',
    filter: false,
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'cc_1',
    filter: false,
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'cc_2',
    filter: false,
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'cc_3',
    filter: false,
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'cc_4',
    filter: false,
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'nn_1',
    filter: false,
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'nn_2',
    filter: false,
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'nn_3',
    filter: false,
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'nn_4',
    filter: false,
    aggFunc: 'sum',
    enableValue: true,
  },
];

const autoGroupColumnDef: ColDef = {
  minWidth: 400,
}

const defaultColDef: ColDef = {
  width: 150,
  resizable: true,
  filter: true,
  sortable: true,
  allowedAggFuncs: ['sum']
}

const modules: Module[] = [
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  CsvExportModule,
  ExcelExportModule,
  FiltersToolPanelModule,
  MenuModule,
  RowGroupingModule,
  SetFilterModule,
];

export const App: React.FC = () => {
  const gridApi = useRef<GridApi>();
  const columnApi = useRef<ColumnApi>();

  const [{ data }, refetch] = useRequest({}, { manual: true });

  const rowData = useMemo(() => {
    return data?.items ?? [];
  }, [data])

  const onGridReady = useCallback(async (event: GridReadyEvent) => {
    try {
      columnApi.current = event.columnApi;
      gridApi.current = event.api;

      await refetch({
        params: {
          take: 5000,
          skip: 0,
        }
      });

      event.api.forEachNode((node) => {
        node.expanded = true;
      });

      event.api.onGroupExpandedOrCollapsed();
    } catch (err) {
      console.error(err);
    }
  }, [refetch]);

  const processRowGroupCallback = useCallback((params: ProcessRowGroupForExportParams) => {
    let indent = '--';
    let node = params.node;
    let label = node.key;

    if (!node.parent?.parent) {
      return label;
    }

    label = '> ' + label;

    while (node.parent?.parent) {
      label = indent + label;
      node = node.parent;
    }

    return label;
  }, [])

  const onClickExportAsExcel = useCallback(() => {
    if (gridApi.current) {
      gridApi.current.exportDataAsExcel({
        columnGroups: true,
        processRowGroupCallback,
      });
    }
  }, [processRowGroupCallback]);

  const onClickExportAsCsv = useCallback(() => {
    if (gridApi.current) {
      gridApi.current.exportDataAsCsv({
        columnGroups: true,
        processRowGroupCallback,
      });
    }
  }, [processRowGroupCallback]);

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: '90vh',  width: '100vw' }}>
        <AgGridReact
          animateRows={true}
          autoGroupColumnDef={autoGroupColumnDef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          modules={modules}
          onGridReady={onGridReady}
          pivotMode={true}
          rowData={rowData}

          debug={true}
          pivotPanelShow="always"
          rowGroupPanelShow="always"
          sideBar={true}
        />
      </div>
      <div>
        <button type="button" disabled={!rowData.length} onClick={onClickExportAsExcel}>
          Export to Excel
        </button>
        <button type="button" disabled={!rowData.length} onClick={onClickExportAsCsv}>
          Export to Csv
        </button>
      </div>
    </>
  );
}
