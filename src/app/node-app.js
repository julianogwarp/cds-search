const axios = require('axios');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const API_KEY = 'AIzaSyANjq9n5tMPR8BleLh3rgvYlHdZtGcwGTQ'; 
const CX = '7165046d72cc1417f';

const recipients = 'julianogwarp@gmail.com, sid@suitesixsixteen.com'
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'julianogwarp@gmail.com',
        pass: 'jhlj oyth xrag itzm '
    }
});
const formatResultsForEmailHTML = (results) => {
    let formattedHTML = '<h2>Here are the latest search results:</h2>';

    results.forEach(result => {
        formattedHTML += `<div>`;
        formattedHTML += `<strong>Title:</strong> ${result.htmlTitle}<br>`;
        formattedHTML += `<strong>Link:</strong> <a href="${result.link}">${result.link}</a><br>`;
        formattedHTML += `<strong>Snippet:</strong> ${result.snippet}<br>`;
        formattedHTML += `</div><hr>`;
    });

    return formattedHTML;
};
async function fetchNewestResultsForChicoDaSilva() {
    try {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                key: API_KEY,
                cx: CX,
                q: 'Chico da Silva',
                dateRestrict: 'w1', // For the past week
            },
        });
        console.log('response', response)
        const processedResults = response.data.items.map(item => {
            return {
                title: item.title,
                htmlTitle: item.htmlTitle,
                link: item.link,
                snippet: item.snippet,
            };
        });
        
        const formattedResults = formatResultsForEmailHTML(processedResults);
        
        return formattedResults;

    
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
}
const sendEmail = async (formattedResults) => {
    let mailOptions = {
        from: 'julianogwarp@gmail.com',
        to: recipients,
        subject: 'Weekly Search Results for Chico da Silva',
        html: formattedResults
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

cron.schedule('0 0 * * Tue', () => {
    fetchNewestResultsForChicoDaSilva().then(results => {
        console.log(results);
        sendEmail(results);
    });
});


