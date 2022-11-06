var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/synergy-dex/cards.git', // Update to point to your repository  
        user: {
            name: '', // update to use your name
            email: '' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)
