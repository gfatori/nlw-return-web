import { SubmitFeedbackService } from "./submit-feedback-service";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit feedback', async () => {

        await expect(submitFeedback.execute({
            type: 'bug',
            comment: 'test',
            screenshot: 'data:image/png;base64, test.jpg',
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feedback without type', async () => {

        await expect(submitFeedback.execute({
            type: '',
            comment: 'test',
            screenshot: 'data:image/png;base64, test.jpg',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without comment', async () => {

        await expect(submitFeedback.execute({
            type: 'test',
            comment: '',
            screenshot: 'data:image/png;base64, test.jpg',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback with invalid format', async () => {

        await expect(submitFeedback.execute({
            type: 'test',
            comment: 'test',
            screenshot: 'batata:image/png;base64, test.jpg',
        })).rejects.toThrow();
    });
});