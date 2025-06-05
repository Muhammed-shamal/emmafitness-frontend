import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

function MarkDownText({text}) {
    const components = {
        img: (props) =>  <Image className='object-contain' alt={props.alt} width={1200} height={500}   {...props} />,
        h1: (props) => <h1 className="text-2xl text-secondary font-bold">{props.children}</h1>,
        h2: (props) => <h2 className="text-xl font-bold">{props.children}</h2>,
        h3: (props) => <h3 className="text-lg font-bold">{props.children}</h3>,
        h3: (props) => <h4 className="text-lg">{props.children}</h4>,
        p: (props) => <p className="mt-2">{props.children}</p>,
        ul: (props) => <ul className="list-outside list-disc pl-4">{props.children}</ul>,
        ol: (props) => <ol className="list-outside list-decimal pl-4">{props.children}</ol>,
        li: (props) => <li>{props.children}</li>,
        u: (props) => <u>{props.children}</u>,
        strong: (props) => <strong>{props.children}</strong>,
        em: (props) => <em>{props.children}</em>,
        // code: Pre,
        // inlineCode: Code,
      }
  return (
    <ReactMarkdown components={components} className="prose lg:prose-xl ">{text}</ReactMarkdown>
  )
}

export default MarkDownText