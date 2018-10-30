import { Router } from "express";

export default class TestRoute {
    public router: Router;

    constructor () {
        this.router = Router();
        this.router.get('/', this.findAll);
        this.router.get('/:id', this.findOne);
    }

    private async findAll (req, res, next) {
        try {
            res.status(200).json({});
        } catch (err) {
            next(err);
        }
    }

    private async findOne (req, res, next) {
        try {
            throw new Error('Hello');
        } catch (err) {
            next(err);
        }
    }
}