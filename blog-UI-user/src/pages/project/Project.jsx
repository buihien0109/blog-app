import React from 'react';
import { Helmet } from 'react-helmet';
import { useGetProjectsQuery } from '../../app/services/project.api';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';

function Project() {
  const { data: projects, isLoading, isError, error } = useGetProjectsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <>
      <Helmet>
        <title>Dự án cá nhân</title>
      </Helmet>
      <div className="max-w-6xl mx-auto py-7">
        <h2 className="mb-1 text-2xl font-semibold">Dự án cá nhân</h2>
        <p className='text-gray-500 mb-5'>Tổng hợp các Pet project & Open source project mình code trong lúc rảnh rỗi</p>
        <div className="mt-6 grid grid-cols-1 gap-6 md:mt-3 md:grid-cols-3 md:gap-6">
          {projects && projects.map((p) => (
            <article>
              <div className="overflow-hidden  bg-gray-100 aspect-[16/9] rounded-md">
                <img className="w-full h-full object-cover"
                  alt={p.title}
                  src={p.thumbnail} />
              </div>
              <div className="mt-2">
                <div className=" max-w-2xl">
                  <h3 className="font-semibold leading-tight text-gray-800 hover:underline text-xl md:text-lg md:leading-tight lg:text-xl lg:leading-tight">
                    {p.title}
                  </h3>
                  <div className="mt-2 flex items-center">
                    {p.source && <a href={p.source} target='_blank' className="text-blue-600 text-sm transition hover:underline cursor-pointer me-3">Link source</a>}
                    {p.link && <a href={p.link} target='_blank' className="text-blue-600 text-sm transition hover:underline cursor-pointer">Link demo</a>}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

export default Project