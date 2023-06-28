import RankingPagination from '../components/RankingPagination';
import RankingTableDetail from './RankingTableDetail';
import Toolbar from './Toolbar';

export default function DeFi() {
  return (
    <>
      <Toolbar />
      <RankingTableDetail />
      <RankingPagination />
    </>
  );
}
