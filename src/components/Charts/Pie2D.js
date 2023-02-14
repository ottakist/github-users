import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Pie2D = ({ data }) => {
  const chartConfigs = {
    type: 'pie2d',
    width: 400,
    height: 400,
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Languages',
        subCaption: '',
        xAxisName: '',
        yAxisName: '',
        numberSuffix: '',
        theme: 'fusion',
        decimals:0,
        pieRadius:"50%"
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};
export default Pie2D;
