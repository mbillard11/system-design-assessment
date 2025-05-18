import styles from './sidebar.module.css'; // Import CSS Module

// Define a type for sidebar items
interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  link: string; 
}

// Define the Sidebar functional component
export default function Sidebar() {

  // Define your sidebar navigation items
  const mainItems: SidebarItem[] = [
    { id: 'explore', label: 'Explore', icon: '✨', link: '/explore' },
    { id: 'subscriptions', label: 'Subscriptions', icon: '📺', link: '/subscriptions' },
  ];

  const libraryItems: SidebarItem[] = [
    { id: 'library', label: 'Library', icon: '📚', link: '/library' },
    { id: 'history', label: 'History', icon: '🕒', link: '/history' },
    { id: 'your-videos', label: 'Your Videos', icon: '🎬', link: '/your-videos' },
    { id: 'watch-later', label: 'Watch Later', icon: '⏰', link: '/watch-later' },
  ];


  return (
    <div>
      {/* Main navigation section */}
      <div className={styles.sidebarSection}>
        <h3 className={styles.sectionTitle}>Feeds</h3>
        {mainItems.map(item => (
          // Using a simple anchor tag for now, replace with Next.js Link
          <a key={item.id} href={item.link} className={styles.sidebarItem}>
            <span className={styles.itemIcon}>{item.icon}</span>
            <span className={styles.itemLabel}>{item.label}</span>
          </a>
        ))}
      </div>

      {/* Separator */}
      <hr className={styles.separator} />

      {/* Library section */}
       <div className={styles.sidebarSection}>
        <h3 className={styles.sectionTitle}>Library</h3>
        {libraryItems.map(item => (
          // Using a simple anchor tag for now, replace with Next.js Link
          <a key={item.id} href={item.link} className={styles.sidebarItem}>
            <span className={styles.itemIcon}>{item.icon}</span>
            <span className={styles.itemLabel}>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};


