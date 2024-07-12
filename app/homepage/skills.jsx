import React from 'react'
import { DiAndroid,DiBootstrap,DiCodeBadge, DiGit, DiJsBadge, DiJava, DiReact, DiNpm, DiHtml5, IconName } from 'react-icons/di'

const Skills = () => {
    return (
        <div className='flex items-center justify-evenly'>
            <DiAndroid className='h-20 w-20'  />
            <DiBootstrap className='h-20 w-20'  />
            <DiCodeBadge className='h-20 w-20'  />
            <DiGit className='h-20 w-20'  />
            <DiJsBadge className='h-20 w-20'  />
            <DiJava className='h-20 w-20'  />
            <DiReact className='h-20 w-20'  />
            <DiNpm className='h-20 w-20'  />
            <DiHtml5 className='h-20 w-20'  />
        </div>
    )
}

export default Skills
