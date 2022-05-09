import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";


interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) { }

    async execute(request: SubmitFeedbackServiceRequest) {
        const { type, comment, screenshot } = request;

        if (screenshot && !screenshot.startsWith('data:image/png;base64,')) {
            throw new Error('Invalid screenshot format');	
        }

        if (!type) {
            throw new Error('Invalid type');
        }

        if (!comment) {
            throw new Error('Invalid comment');
        }
        
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback do usuário',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                `<p>Novo feedback de ${type}</p>`,
                `Comment: ${comment}`,
                `</div>`
            ].join('\n')
        })
}
}