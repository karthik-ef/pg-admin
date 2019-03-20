import axios from 'axios';
import * as API from '../utils/endpoints';

// export function getUserMarkets() {
//     axios.get(API.getUserMarkets + JSON.parse(localStorage.getItem('UserName')))
//         .then(result => {
//             this.userSpecificMarkets = result.data;
//             filterMarkets(this);
//         })
//         .catch(err => { console.log(err) });
// }

// function filterMarkets(instance) {
//     axios.get(API.getUniqueContentMarkets)
//       .then(res => {
//         var uniqueContentMarkets = res.data;
//         instance.setState({
//           availableMarkets: instance.userSpecificMarkets.filter(m => uniqueContentMarkets.map(m => { return m.MarketCode })
//             .includes(m.MarketCode)).sort((a, b) => a.Name.localeCompare(b.Name))
//         });
//       })
//       .catch(err => console.log(err));
//   }
  