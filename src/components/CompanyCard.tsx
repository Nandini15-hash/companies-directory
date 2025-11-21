import React from 'react';
import { Company } from '../types/company';
import { MapPin, Users, Calendar, Globe, Mail, ExternalLink } from 'lucide-react';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const handleWebsiteClick = (e: React.MouseEvent, website: string) => {
    e.preventDefault();
    window.open(website, '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="company-card">
      <div className="card-header">
        <h3 className="company-name">{company.name}</h3>
        <span className="industry-badge">
          {company.industry}
        </span>
      </div>

      <p className="company-description">{company.description}</p>

      <div className="company-details">
        <div className="detail-item">
          <MapPin size={16} className="detail-icon" />
          <span>{company.location}</span>
        </div>
        <div className="detail-item">
          <Users size={16} className="detail-icon" />
          <span>{company.size} employees</span>
        </div>
        <div className="detail-item">
          <Calendar size={16} className="detail-icon" />
          <span>Founded {company.founded}</span>
        </div>
      </div>

      <div className="card-footer">
        <div className="contact-links">
          {company.website && (
            <a
              href={company.website}
              onClick={(e) => handleWebsiteClick(e, company.website)}
              className="contact-link website-link"
              title="Visit website"
            >
              <Globe size={18} />
              <ExternalLink size={12} style={{ marginLeft: '4px' }} />
            </a>
          )}
          {company.email && (
            <a
              href={`mailto:${company.email}`}
              onClick={(e) => handleEmailClick(e, company.email)}
              className="contact-link email-link"
              title="Send email"
            >
              <Mail size={18} />
            </a>
          )}
        </div>
        <span className="company-id">ID: {company.id}</span>
      </div>

      {/* Additional Info */}
      <div style={{ 
        marginTop: '15px', 
        paddingTop: '15px', 
        borderTop: '1px solid #e2e8f0',
        fontSize: '0.8rem',
        color: '#718096'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Established: {new Date().getFullYear() - company.founded} years ago</span>
          <span>•</span>
          <span>{
            company.size === '5000+' ? 'Large Enterprise' :
            company.size === '1000-5000' ? 'Enterprise' :
            company.size === '500-1000' ? 'Large Company' :
            company.size === '100-500' ? 'Medium Company' :
            'Small Company'
          }</span>
        </div>
      </div>
    </div>
  );
};