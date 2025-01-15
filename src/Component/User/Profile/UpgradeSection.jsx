import React from 'react';
import styles from './UpgradeSection.module.css';

function UpgradeSection() {
  return (
    <aside className={styles.upgradeSection}>
      <h3 className={styles.upgradeTitle}>Upgrade to Pro</h3>
      <ul className={styles.upgradeList}>
        <li className={styles.upgradeListItem}>Unlimited Job Post</li>
        <li className={styles.upgradeListItem}>Multiple job communication</li>
        <li className={styles.upgradeListItem}>Unlimited calling access from different city</li>
        <li className={styles.upgradeListItem}>Hire 10+ freelancers for one project</li>
        <li className={styles.upgradeListItem}>Filter, block, search talent freelancers</li>
      </ul>
      <button className={styles.upgradeBtn}>Upgrade Plan</button>
    </aside>
  );
}

export default UpgradeSection;
