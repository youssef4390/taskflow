import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

interface Project { id: string; name: string; color: string; }
interface SidebarProps {
  projects: Project[];
  isOpen: boolean;
  onRenameProject: (id: string, name: string) => Promise<void>;
  onRemoveProject: (id: string) => Promise<void>;
}

export default function Sidebar({ projects, isOpen, onRenameProject, onRemoveProject }: SidebarProps) {
  async function handleRename(project: Project) {
    const newName = window.prompt('Renommer le projet', project.name);
    if (!newName) return;
    const trimmed = newName.trim();
    if (!trimmed) return;
    await onRenameProject(project.id, trimmed);
  }

  async function handleDelete(id: string) {
    if (window.confirm('Supprimer ce projet ?')) {
      await onRemoveProject(id);
    }
  }

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <h2 className={styles.title}>Mes Projets</h2>
      <ul className={styles.list}>
        {projects.map(p => (
          <li key={p.id} className={styles.projectItem}>
            <NavLink
              to={`/projects/${p.id}`}
              className={({ isActive }: { isActive: boolean }) =>
                `${styles.item} ${isActive ? styles.active : ''}`
              }
            >
              <span className={styles.dot} style={{ background: p.color }} />
              {p.name}
            </NavLink>
            <div className={styles.actions}>
              <button type="button" className={styles.actionButton} onClick={() => void handleRename(p)}>
                ✏️
              </button>
              <button type="button" className={styles.actionButton} onClick={() => void handleDelete(p.id)}>
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}