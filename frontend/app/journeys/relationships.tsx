import SpreadJourney from '@/components/SpreadJourney';
import relationships from '../../../cms/spreads/relationships';

export default function RelationshipsJourney() {
  return <SpreadJourney spread={relationships} slug="relationships" />;
}
