import importAssets from './importAssets'

const getAssets = importAssets('./assets/adventure/')
export default {
    name: 'Adventure',
    scenes: [
        {
            name: 'Ate my Homework',
            ...getAssets('1_homework')
        },
        {
            name: ''
        }
        
    ]
}
