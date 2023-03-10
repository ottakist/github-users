import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
const Doughnut2d =  ({ data }) => {
  const chartConfigs = {
    type: 'doughnut2d',
    width: 400,
    height: 400,
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Stars PerLanguage',
        subCaption: '',
        xAxisName: '',
        yAxisName: '',
        numberSuffix: '',
        theme: 'fusion',
        decimals: 0,
        showPercentValues: 0,
        pieRadius: '45%',
        doughnutRadius: '60%',
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Doughnut2d;
