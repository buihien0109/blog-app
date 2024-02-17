import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import slugify from 'slugify';

function TableOfContents() {
    const location = useLocation();
    const [headings, setHeadings] = useState([]);
    const [activeHeadingId, setActiveHeadingId] = useState(null);
    const observer = useRef(null);

    useEffect(() => {
        const headingsArray = [];

        const traverseHeadings = (elements, parentLevel = 0) => {
            elements.forEach(heading => {
                const level = parseInt(heading.tagName.charAt(1));
                const id = slugify(heading.textContent, { lower: true, trim: true })
                heading.id = id;
                const text = heading.textContent;

                headingsArray.push({
                    id,
                    text,
                    level,
                    element: heading
                });

                if (heading.children.length > 0) {
                    traverseHeadings(heading.children, level);
                }
            });
        };

        const contentEl = document.getElementById('blog-content');
        const topLevelHeadings = contentEl.querySelectorAll('h2, h3, h4');
        traverseHeadings(topLevelHeadings);
        setHeadings(headingsArray);
    }, [location.pathname]);

    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveHeadingId(entry.target.id);
                }
            });
        }, { rootMargin: "-20% 0% -35% 0px" });

        headings.forEach(heading => {
            observer.current.observe(heading.element);
        });

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [headings]);

    const scrollToHeading = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const renderHeadings = (headings) => {
        return (
            <ul>
                {headings.map(heading => (
                    <li key={heading.id}>
                        <a
                            href={`#${heading.id}`}
                            className={`text-gray-500 text-sm block py-2 level-${heading.level} pr-2 border-s ${activeHeadingId === heading.id ? 'active' : ''}`}
                            onClick={(e) => scrollToHeading(e, heading.id)}>
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            {headings.length > 0 && (
                <div className="row">
                    <div className="col-12">
                        <div className="mb-4">
                            <h2 className='mb-3 text-lg font-semibold'>Mục lục</h2>
                            <div id='toc-container'>
                                {renderHeadings(headings)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TableOfContents;