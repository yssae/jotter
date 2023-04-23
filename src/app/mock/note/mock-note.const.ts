import { Note } from "src/app/shared/models/note.model";

export const note: Note[] = [
  {
    _id: '885001',
    notebookID : '485001',
    title: 'the 1',
    content: `
    <p class="ql-align-center"><em>I'm doing good, I'm on some new shit</em></p>
    <p class="ql-align-center"><em>Been saying "yes" instead of no</em></p>
    <p class="ql-align-center"><em>I thought I saw you at the bus stop, I didn't though</em></p>
    <p class="ql-align-center"><em>I hit the ground running each night</em></p>
    <p class="ql-align-center"><em>I hit the Sunday matinée</em></p>
    <p class="ql-align-center"><em>You know the greatest films of all time were never made.</em></p>`,
    background: '#262626',
  },
  {
    _id: '885002',
    notebookID : '485001',
    title: 'Cardigan',
    content: `
    <p class="ql-align-center"><em class="ql-font-monospace">Vintage tee, brand new phone</em></p>
    <p class="ql-align-center"><em class="ql-font-monospace">High heels on cobblestones</em></p>
    <p class="ql-align-center"><em class="ql-font-monospace">When you are young, they assume you know nothing</em></p>
    <p class="ql-align-center"><em class="ql-font-monospace">Sequin smile, black lipstick</em></p>
    <p class="ql-align-center"><em class="ql-font-monospace">Sensual politics</em></p>
    <p class="ql-align-center"><em class="ql-font-monospace">When you are young, they assume you know nothing</em></p>`,
    images : [
      {
        name: 'Cardigan',
        url: 'https://townsquare.media/site/252/files/2020/07/taylor-swift-cardigan.jpg?w=980&q=75',
      }
    ],
    background: '#FFFFFF'
  },
  {
    _id: '885003',
    notebookID : '485001',
    title: 'The Last Great American Dynasty',
    content: `
    <p><em class="ql-font-serif">Rebekah rode up on the afternoon train. It was sunny</em></p>
    <p><em class="ql-font-serif">Her saltbox house on the coast </em></p>
    <p><em class="ql-font-serif">Took her mind off St. Louis </em></p>
    <p><em class="ql-font-serif">Bill was the heir to the Standard Oil name and money.</em></p>`,
    background: '#FFFFFF'
  },
]
