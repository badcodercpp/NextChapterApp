import { AppCard } from '@/components/foundation/AppCard';
import { JourneyFooter } from './components/JourneyFooter';
// import { JourneyHeader } from './components/JourneyHeader';
import { JourneyProgress } from './components/JourneyProgress';
import { RecoveryRing } from './components/RecoveryRing';
import { RecoveryScore } from './components/RecoveryScore';
import { View } from 'react-native';
import { mockJourney } from './mock';
import { styles } from './styles';

export function JourneySection() {
  return (
    <AppCard style={styles.container}>
      {/* <JourneyHeader /> */}

      {/* <View style={styles.content}>
        <View style={styles.left}>
          <JourneyProgress
            day={mockJourney.currentDay}
            totalDays={mockJourney.totalDays}
            phase={mockJourney.phase}
          />
        </View>

        <View style={styles.right}>
          <RecoveryScore
            score={mockJourney.recoveryScore}
            change={mockJourney.scoreChange}
          />

          <RecoveryRing progress={mockJourney.recoveryScore} />
        </View>
      </View> */}

      <View style={styles.topRow}>
        <JourneyProgress
          day={mockJourney.currentDay}
          totalDays={mockJourney.totalDays}
          phase={mockJourney.phase}
        />

        <RecoveryScore
          score={mockJourney.recoveryScore}
          change={mockJourney.scoreChange}
        />

        <RecoveryRing progress={mockJourney.recoveryScore} />
      </View>

      <JourneyFooter
        completed={mockJourney.completedDays}
        remaining={mockJourney.remainingDays}
        progress={mockJourney.currentDay / mockJourney.totalDays}
      />
    </AppCard>
  );
}
