import express from 'express'
import { UID, User, UserInfo } from '../../scheme/user'
import db from '../util/db'
import createResponse from '../createResponse'
import { Permission } from '../../scheme/api/auth'
import { PenaltyResponseOne, PID } from '../../scheme/api/penalty'
import { uuid } from '../util/random'
import { createNotify } from '../util/notification'
import { PENALTY_GOT } from '../../string/notify'
import { DB_CONNECT_ERROR, REQUIRE_PERMISSION_ERROR } from '../../string/error'

const router = express.Router()

async function getBusking(res: any) {
    const buskingDB = await db.direct('y2021', 'iasa_busking')
    const buskingList = await buskingDB.find({}).sort('_id', -1).toArray()
    res.send(createResponse(buskingList))
}

async function addBusking(name: string, call: string, res: any) {
    try {
        if (!name || !call) {
            res.status(412)
            res.send(createResponse(false, '내용을 모두 채워주세요.'))
            return
        }

        const buskingDB = await db.direct('y2021', 'iasa_busking')
        const buskingList = await buskingDB.find({}).toArray()

        if (buskingList.length >= 60) {
            res.status(412)
            res.send(createResponse(false, '신청이 마감되었어요.'))
            return
        }
        if (new Date(Date.now()) < new Date(2021, 4, 12, 13, 0, 0)) {
            res.status(412)
            res.send(createResponse(false, '아직 신청 시간 전이에요.'))
            return
        }

        let register = (await db.get('y2021', 'call', call, 'iasa_busking')) as
            | User
            | undefined
        if (register) {
            res.status(404)
            res.send(createResponse(false, '이미 신청했어요.'))
            return
        }

        let pid = uuid()
        await db.set(
            'y2021',
            {
                name,
                call,
                pid,
                time: Date.now(),
            },
            'iasa_busking'
        )
        res.send(createResponse(true))
    } catch (e) {
        res.send(false, DB_CONNECT_ERROR)
    }
}

async function deleteBusking(pid: string, res: any) {
    const buskingInfo = (await db.get(
        'y2021',
        'pid',
        pid,
        'iasa_busking'
    )) as PenaltyResponseOne
    if (!buskingInfo) {
        res.status(404)
        res.send(createResponse(false, '올바르지 않은 버스킹 ID에요.'))
        return
    }
    await db.del('y2021', 'pid', pid, 'iasa_busking')
    res.send(createResponse(true))
}

router.get('/', async (req, res) => {
    await getBusking(res)
})

router.post('/', async (req, res) => {
    await addBusking(req.body.name, req.body.call, res)
})

router.delete('/:pid', async (req, res) => {
    await deleteBusking(req.params.pid, res)
})

export default router
