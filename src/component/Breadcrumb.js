import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();

  // Split the current path into segments
  const pathnames = location.pathname.split('/').filter((item) => item);

  // Mapping URLs to display text (make sure path names are lowercase)
  const breadcrumbMap = {
    '': 'Landing Page',
    home: 'Home',
    update: 'Update',
    // Add more mappings for future routes if needed
  };

  return (
    <div className="breadcrumb text-primary py-2">
      {/* Always start with Landing Page */}
      <span>
        <Link to="/">{breadcrumbMap['']}</Link> &gt;
      </span>

      {/* Always show Home after Landing Page */}
      {pathnames.length > 0 && (
        <span>
          <Link to="/home">{breadcrumbMap['home']}</Link> &gt;
        </span>
      )}

      {/* Dynamic Breadcrumbs based on the URL path */}
      {pathnames.map((pathname, index) => {
        // Skip 'home' as it's already manually added
        if (pathname.toLowerCase() === 'home') return null;

        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbMap[pathname.toLowerCase()]; // Ensure case-insensitive matching

        return isLast ? (
          <span key={pathname}> {displayName}</span>
        ) : (
          <span key={pathname}>
            <Link to={routeTo}> {displayName}</Link> &gt;
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
