import { useState, useEffect } from 'react'; 
import { useAuth } from '../features/auth/AuthContext'; 
import api from '../axios'; 
import Header from '../components/Header'; 
import styles from './ProjectDetail.module.css'; 
import { useParams, useNavigate } from 'react-router-dom';
  
interface Project { id: string; name: string; color: string; } 
  
export default function ProjectDetail() { 
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const authState = useAuth(); 
  const [project, setProject] = useState<Project | null>(null); 
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => { 
    api.get(`/projects/${id}`) 
      .then((res: { data: Project }) => setProject(res.data)) 
      .catch(() => navigate('/dashboard')) 
      .finally(() => setLoading(false)); 
  }, [id, navigate]); 
  
  if (loading) return <div className={styles.loading}>Chargement...</div>; 
  if (!project) return null; 
  
  if (!authState) return <div>Loading auth...</div>;
  
  return ( 
    <div className={styles.layout}> 
      <Header 
        title="TaskFlow" 
        onMenuClick={() => navigate('/dashboard')} 
        userName={authState.state?.user?.name || 'Guest'}
        onLogout={() => authState.dispatch({ type: 'LOGOUT' })} 
      /> 
      <main className={styles.main}> 
        <div className={styles.header}> 
          <span className={styles.dot} style={{ background: project.color }} /> 
          <h2>{project.name}</h2> 
        </div> 
        <p className={styles.info}>Projet ID: {project.id}</p> 
      </main> 
    </div> 
  ); 
}