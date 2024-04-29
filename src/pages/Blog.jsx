import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import { articleCollection } from '../data/articles';
import { ArticleList } from '../features/articles/ArticleList';
export default function Blog () {

  const [filter, setFilter] = useState('');

  const [defaultArticles, setDefaultArticles] = useState(articleCollection.articles);
  const [pageHeight, setPageHeight] = useState();

  const [filtered, setFiltered] = useState([])


  useEffect(() => {
   setDefaultArticles(articleCollection.articles);
  }, [])



  return (
    <div className='recipe-page' style={{maxHeight: '110vh'}} >
      {defaultArticles &&
        <ArticleList data={defaultArticles} />
      }
    </div >
  );
}
