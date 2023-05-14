function LittleCard ({ title, icon, value, description }) {
    return (
          <div className="stats shadow rounded-2xl grid-flow-col overflow-x-auto bg-white">
             <div className="stat w-full grid-cols-1 inline-grid px-6 py-4 gap-1">
                <div className="stat-figur row-start-1 row-span-3 col-start-2 place-self-center justify-self-center">{icon}</div>
                <div className="stat-title col-start-1 whitespace-nowrap text-gray-400">{title}</div>
                 <div className={'stat-value col-start-1 whitespace-nowrap text-4xl font-extrabold text-primaryText'}>{value}</div>
                 <div className={'stat-desc col-start-1 whitespace-nowrap text-xs  ' }>{description}</div>
             </div>
          </div>
    )
  }
  export default LittleCard
  