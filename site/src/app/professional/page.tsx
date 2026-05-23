import type { Metadata } from 'next';
import SiteNav from '@/components/ui/SiteNav';
import Footer from '@/components/ui/Footer';
import { projects } from '@/content/data';

export const metadata: Metadata = {
  title: 'Professional — M.N. Cook',
  description: 'Software projects spanning 3D visualization, AI transcription, mesh processing, VR, IoT, and museum technology.',
};

export default function ProfessionalPage() {
  return (
    <div className="section-warm">
      <SiteNav variant="warm" />

      <div className="content-section" style={{ paddingTop: '120px' }}>
        <div className="section-header">
          <div className="section-label">Engineering</div>
          <h1 className="section-title">Professional</h1>
          <p className="section-desc">
            As Digital Scholarship Program Manager for Harvard Library (and, formerly, as Head of Emerging Technologies for the University of Oklahoma Libraries), I explore/develop/deploy tech for research and instructional purposes.
          </p>
        </div>

        <div className="project-grid">
          {projects.map(project => (
            <a
              key={project.id}
              href={project.liveUrl || project.url || '#'}
              target={project.url ? '_blank' : undefined}
              rel={project.url ? 'noopener noreferrer' : undefined}
              className="project-card"
              id={`project-${project.id}`}
            >
              <div className="project-card-image">
                {project.emoji}
              </div>
              <div className="project-card-body">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.description}</p>
                <div className="project-card-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
