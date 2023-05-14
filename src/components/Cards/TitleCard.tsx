
import Subtitle from '../Typography/Subtitle'
interface Props {
  title: string
  children?: React.ReactNode
  topMargin?: string
  TopSideButtons?: React.ReactNode
}

function TitleCard ({ title, children, topMargin = 'mt-6', TopSideButtons }: Props) {
  return (
          <div className={` relative flex rounded-2xl
           focus:outline-2 focus:outline-offset-2 bg-white flex-col w-full p-6 bg-base-100 shadow-xl transition-all  ${topMargin}`}>

            {/* Title for Card */}
              <Subtitle styleClass={TopSideButtons ? 'inline-block' : ''}>
                {title}

                {/* Top side button, show only if present */}
                {
                    TopSideButtons && <div className="inline-block float-right">{TopSideButtons}</div>
                }
              </Subtitle>

              <div className=" flex items-center self-stretch my-4 gap-4 flex-nowrap after:flex-grow h-[2px] w-full bg-primaryBG mt-2"></div>

              {/** Card Body */}
              <div className='h-full w-full pb-6 bg-base-100'>
                  {children}
              </div>
          </div>

  )
}

export default TitleCard
// .card {
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   border-radius: var(--rounded-box, 1rem);
// }
// .card:focus {
//   outline: 2px solid transparent;
//   outline-offset: 2px;
// }
// .card figure {
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }
// .card.image-full {
//   display: grid;
// }
// .card.image-full:before {
//   position: relative;
//   content: "";
//   z-index: 10;
//   --tw-bg-opacity: 1;
//   background-color: hsl(var(--n) / var(--tw-bg-opacity));
//   opacity: 0.75;
//   border-radius: var(--rounded-box, 1rem);
// }
// .card.image-full:before,
//   .card.image-full > * {
//   grid-column-start: 1;
//   grid-row-start: 1;
// }
// .card.image-full:before,
//   .card.image-full > * {
//   grid-column-start: 1;
//   grid-row-start: 1;
// }
// .card.image-full > figure img {
//   height: 100%;
//   object-fit: cover;
// }
// .card.image-full > .card-body {
//   position: relative;
//   z-index: 20;
//   --tw-text-opacity: 1;
//   color: hsl(var(--nc) / var(--tw-text-opacity));
// }
// .card :where(figure:first-child) {
//   overflow: hidden;
//   border-start-start-radius: inherit;
//   border-start-end-radius: inherit;
//   border-end-start-radius: unset;
//   border-end-end-radius: unset;
// }
// .card :where(figure:last-child) {
//   overflow: hidden;
//   border-start-start-radius: unset;
//   border-start-end-radius: unset;
//   border-end-start-radius: inherit;
//   border-end-end-radius: inherit;
// }
// .card:focus-visible {
//   outline: 2px solid currentColor;
//   outline-offset: 2px;
// }
// .card.bordered {
//   border-width: 1px;
//   --tw-border-opacity: 1;
//   border-color: hsl(var(--b2, var(--b1)) / var(--tw-border-opacity));
// }
// .card.compact .card-body {
//   padding: 1rem/* 16px */;
//   font-size: 0.875rem/* 14px */;
//   line-height: 1.25rem/* 20px */;
// }
// .card.image-full :where(figure) {
//   overflow: hidden;
//   border-radius: inherit;
// }