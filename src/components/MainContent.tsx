import styles from './MainContent.module.css'; 
  
interface Column { id: string; title: string; tasks: string[]; } //ceci est la creation de l'interface pour l'affichage des cololnnes et des tâches, elle est utilisée pour typer les props du composant MainContent
interface MainContentProps { columns: Column[]; } //ceci est la creation de l'interface pour les colonnes et les tâches, elle est utilisée pour typer les props du composant MainContent
  
export default function MainContent({ columns }: MainContentProps) { 
  return ( 
<main className={styles.main}> 
<div className={styles.board}> 
{columns.map(col => ( 
<div key={col.id} className={styles.column}> 
<h3 className={styles.colTitle}>{col.title} ({col.tasks.length})</h3> 
{col.tasks.map((task, i) => ( 
<div key={i} className={styles.card}>{task}</div> 
))} 
</div> 
))} 
</div> 
</main> 
); 
} 