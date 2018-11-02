import { Router } from "express";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

const ageRegex = /^[0-9]{1,2}$/;
const nameRegex = /^[a-zA-Z]{3,20}$/;
const hasValidParams = ({age, firstName, lastName}) => {
    if(!ageRegex.test(age) ||
            !nameRegex.test(firstName) ||
            !nameRegex.test(lastName)) {
        return false;
    }
    return true;
}

export default class UserRoute {
    public router: Router;

    constructor () {
        this.router = Router();
        this.router.get('/', this.findAll);
        this.router.get('/:id', this.findOne);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }

    private async create (req, res, next) {
        try {
            const body = req.body;

            if(!hasValidParams(body)) return res.status(400).json({message: 'Bad request'});

            const userRepo = await getConnection().getRepository(User);
            const user = new User();
            user.age = body.age;
            user.firstName = body.firstName;
            user.lastName = body.lastName;
            await userRepo.save(user);

            return res.status(201).json({message: 'success'});
        } catch (err) {
            next(err);
        }
    }

    private async update (req, res, next) {
        try {
            const id = req.params.id;

            if(!hasValidParams(req.body)) return res.status(400).json({message: 'Bad request'});

            // Without transaction
            // await getConnection().createQueryBuilder().update(User).set({age, firstName, lastName}).where({id}).execute();

            // using transactional entity manager
            await getConnection().transaction(async tem => {
                await tem.createQueryBuilder().update(User).set({...req.body}).where({id}).execute();
            });

            return res.status(200).json({message: 'success'});
        } catch (err) {
            next(err);
        }
    }

    private async delete (req, res, next) {
        try {
            const id = req.params.id;

            await getConnection().transaction(async tem => {
                await tem.createQueryBuilder().update(User).set({deletedAt: new Date().toISOString()}).execute();
            });

            return res.status(204).json({message: 'success'});
        } catch (err) {
            next(err);
        }
    }

    private async findAll (req, res, next) {
        try {
            const userRepo = await getConnection().getRepository(User);
            const users = await userRepo.find();
            res.status(200).json({users});
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