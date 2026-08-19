import React from 'react'
import { ListIcon, WriteIcon } from '../../../../shared/ui/components/Icons';
import Card from '../components/Card';

const contentFeatures = [
  {
    id: "rewrite",
    link: "/main/content/generate/rewrite",
    title: "Rewrite Content",
    description: "Rewrite your content with AI",
    icon: <WriteIcon style="w-6 h-6 text-blue-600" />,
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    id: "expand",
    link: "/main/content/generate/expand",
    title: "Expand content",
    description: "Make your content more detailed with AI",
    icon: <WriteIcon style="w-6 h-6 text-indigo-600" />,
    gradient: "from-indigo-600 to-purple-600",
  },
  {
    id: "shorten",
    link: "/main/content/generate/shorten",
    title: "Shorten Content",
    description: "Make your content more concise with AI",
    icon: <WriteIcon style="w-6 h-6 text-orange-600" />,
    gradient: "from-orange-600 to-stone-400",
  },
  {
    id: "seo-content",
    link: "/main/content/generate/seo-content",
    title: "SEO content",
    description:
      "Automatically generate SEO title, keyword, and meta description",
    icon: <ListIcon style="w-6 h-6 text-cyan-600" />,
    gradient: "from-cyan-500 to-pink-500",
  },
  {
    id: "generate-article",
    link: "/main/content/generate/generate",
    title: "Generate Article",
    description: "Create a new article with AI",
    icon: <WriteIcon style="w-6 h-6 text-green-600" />,
    gradient: "from-green-600 to-cyan-600",
  },
  {
    id: "history",
    link: "/main/content/history",
    title: "Content history",
    description: "View and manage all your generated content",
    icon: <ListIcon style="w-6 h-6 text-purple-600" />,
    gradient: "from-purple-500 to-pink-500",
  },
];

const Content = () => {
  return (
    <div className='bg-gray-300/35 min-h-screen'>
        <div className='w-full flex flex-col justify-center items-center p-10 gap-3'>
            <h1 className='text-5xl font-semibold'>Content Management</h1>
            <p className='text-shadow-gray-500 opacity-60 text-lg'>Transform and manage your content with AI-powered tools</p>
        </div>
        <div className='w-full py-3 flex gap-6 justify-center items-center flex-wrap'>
            {contentFeatures.map((feature)=> (
                <Card key={feature.id} link={feature.link} title={feature.title} desc={feature.description} icon={feature.icon} gradient={feature.gradient}/>
            )) }
        </div>
    </div>
  )
}

export default Content
