import * as echarts from 'echarts/core'
import {
    BarChart,
    LineChart,
    PieChart,
    type BarSeriesOption,
    type LineSeriesOption,
    type PieSeriesOption
} from 'echarts/charts'

import { 
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    type TitleComponentOption,
    type TooltipComponentOption,
    type GridComponentOption,
    type DatasetComponentOption,
} from 'echarts/components'

import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'


echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LineChart,
    PieChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
]);

type ECOption = echarts.ComposeOption<
    | BarSeriesOption
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
    | PieSeriesOption
>;

export { echarts }
export type { ECOption }
