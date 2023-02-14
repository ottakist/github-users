import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Bar2D = ({data}) => {
 
  const chartConfigs = {
    type: 'bar2d',
    width: '100%',
    height: 400,
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Most Forked',
        subCaption: '',
        xAxisName: 'Repos',
        yAxisName: 'Forks',
        numberSuffix: '',
        theme: 'fusion',
        paletteColors: '#2caeba,#5d62b5,#ffc533,#f2726f,#8d6e63',
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};
export default Bar2D;
