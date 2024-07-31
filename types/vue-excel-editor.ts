// RecordType defines the structure of each row in the table
export interface RecordType {
    date: string;
    activities: string;
    startTime: string;
    endTime: string;
    hours: number;
    remarks: string;
  }
  
  // ColumnType defines the structure of each column in the table
  export interface ColumnType {
    field: keyof RecordType;
    label: string;
    type: string;
    width?: string;
    readonly?: boolean;
    initStyle?: object;
    sticky?: boolean;
    invisible?: boolean;
    autoFillWidth?: boolean;
    change?: (newValue: any, oldValue: any) => void;
    validate?: (value: any) => string | null;
    keyField?: boolean;
    allowKeys?: (string | number)[];
    mandatory?: string;
    lengthLimit?: number;
    autocomplete?: boolean;
    pos?: number;
    textTransform?: 'uppercase' | 'lowercase';
    textAlign?: 'left' | 'center' | 'right';
    options?: Array<string | number> | Record<string, any>;
    summary?: 'sum' | 'avg' | 'max' | 'min';
    sort?: (a: any, b: any) => number;
    link?: (value: any) => void;
    isLink?: (value: any) => boolean;
    toText?: (value: any) => string;
    toValue?: (text: string) => any;
    placeholder?: string;
  }
  
  // Props for vue-excel-editor component
  export interface ExcelEditorProps {
    vModel: RecordType[];
    page?: number;
    noPaging?: boolean;
    noNumCol?: boolean;
    filterRow?: boolean;
    noFooter?: boolean;
    noFinding?: boolean;
    noFindingNext?: boolean;
    freeSelect?: boolean;
    autocomplete?: boolean;
    autocompleteCount?: number;
    readonly?: boolean;
    readonlyStyle?: object;
    height?: string;
    width?: string;
    rowStyle?: (row: RecordType) => object;
    cellStyle?: (cell: any) => object;
    headerLabel?: (fieldLabel: string, field: ColumnType) => string;
    recordLabel?: (recordPosition: number, record: RecordType) => string;
    localizedLabel?: Record<string, string>;
    nFilterCount?: number;
    remember?: boolean;
    enterToSouth?: boolean;
    allowAddCol?: boolean;
    addColumn?: () => ColumnType;
    noHeaderEdit?: boolean;
    spellcheck?: boolean;
    newIfBottom?: boolean;
    disablePanelSetting?: boolean;
    disablePanelFilter?: boolean;
    noMouseScroll?: boolean;
  }
  
  // Props for vue-excel-column component
  export interface ExcelColumnProps {
    field: keyof RecordType;
    label?: string;
    type?: string;
    readonly?: boolean;
    initStyle?: object;
    sticky?: boolean;
    invisible?: boolean;
    width?: string;
    autoFillWidth?: boolean;
    change?: (newValue: any, oldValue: any) => void;
    validate?: (value: any) => string | null;
    keyField?: boolean;
    allowKeys?: (string | number)[];
    mandatory?: string;
    lengthLimit?: number;
    autocomplete?: boolean;
    pos?: number;
    textTransform?: 'uppercase' | 'lowercase';
    textAlign?: 'left' | 'center' | 'right';
    options?: Array<string | number> | Record<string, any>;
    summary?: 'sum' | 'avg' | 'max' | 'min';
    sort?: (a: any, b: any) => number;
    link?: (value: any) => void;
    isLink?: (value: any) => boolean;
    toText?: (value: any) => string;
    toValue?: (text: string) => any;
    placeholder?: string;
  }
  