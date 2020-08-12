import React, { useCallback } from 'react';

import useRequest, { RefetchOptions } from 'axios-hooks';
import { AxiosPromise, AxiosRequestConfig } from 'axios';

import { AgGridReact } from '@ag-grid-community/react';
import { ColDef, ColGroupDef, ColumnApi, GridReadyEvent, IServerSideDatasource, IServerSideGetRowsParams, IServerSideGetRowsRequest } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

const columnDefs = [
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
    enablePivot: true,
    rowGroup: true,
    hide: true
  },
  {
    field: 'name',
    enableRowGroup: true,
    enablePivot: true,
    rowGroup: true,
    hide: true
  },
  {
    field: 'employee_number',
  },
  {
    field: 'name_manager',
  },
  {
    field: 'employee_number_manager',
  },
  {
    field: 'aht_1',
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'aht_2',
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'aht_3',
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'aht_4',
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'cc_1',
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'cc_2',
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'cc_3',
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'cc_4',
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'nn_1',
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'nn_2',
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'nn_3',
    aggFunc: 'sum',
    enableValue: true,
  },
  {
    field: 'nn_4',
    aggFunc: 'sum',
    enableValue: true,
  },
];

const autoGroupColumnDef = {
  minWidth: 200
}

const defaultColDef = {
  width: 150,
  resizable: true,
  sortable: true,
  allowedAggFuncs: ['sum']
}

const modules = [
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
]

export const App: React.FC = () => {
  const [{ data }, refetch] = useRequest({}, { manual: true });

  const onGridReady = useCallback(async (event: GridReadyEvent) => {
    try {
      await refetch({
        params: {
          take: 5000,
          skip: 0,
        }
      });
    } catch (err) {
      console.error(err);
    }
  }, [refetch]);

  return (
    <div className="ag-theme-alpine" style={{ height: '100vh',  width: '100vw' }}>
      <AgGridReact
        animateRows={true}
        autoGroupColumnDef={autoGroupColumnDef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        modules={modules}
        onGridReady={onGridReady}
        rowData={data?.items ?? []}
        pivotMode={true}

        debug={true}
        pivotPanelShow="always"
        rowGroupPanelShow="always"
        sideBar={true}
      />
    </div>
  );
}
