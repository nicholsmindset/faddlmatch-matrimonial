'use server';

import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';
import { Member, Photo } from '@prisma/client';
import { addYears } from 'date-fns';
import { getAuthUserId } from './authActions';
import { GetMemberParams, PaginatedResponse } from '@/types';

function getAgeRange(ageRange: string): Date[] {
    const [minAge, maxAge] = ageRange.split(',');
    const currentDate = new Date();
    const minDob = addYears(currentDate, -maxAge - 1);
    const maxDob = addYears(currentDate, -minAge);

    return [minDob, maxDob];
}

export async function getMembers({
    ageRange = '18,100',
    gender = 'male,female',
    orderBy = 'updated',
    pageNumber = '1',
    pageSize = '12',
    withPhoto = 'true'
}: GetMemberParams): Promise<PaginatedResponse<Member>> {
    const userId = await getAuthUserId();

    const [minDob, maxDob] = getAgeRange(ageRange);

    const selectedGender = gender.split(',');

    const page = parseInt(pageNumber);
    const limit = parseInt(pageSize);

    const skip = (page - 1) * limit;

    try {
        const whereClause = {
            AND: [
                { dateOfBirth: { gte: minDob, lte: maxDob } },
                { gender: { in: selectedGender } },
                ...(withPhoto === 'true' ? [{ image: { not: null } }] : [])
            ],
            NOT: { userId }
        };

        // Use Promise.all for parallel execution
        const [count, members] = await Promise.all([
            prisma.member.count({ where: whereClause }),
            prisma.member.findMany({
                where: whereClause,
                orderBy: { [orderBy]: 'desc' },
                skip,
                take: limit,
                select: {
                    id: true,
                    userId: true,
                    name: true,
                    image: true,
                    gender: true,
                    dateOfBirth: true,
                    city: true,
                    country: true,
                    description: true,
                    created: true,
                    updated: true
                }
            })
        ]);

        return {
            items: members,
            totalCount: count
        }
    } catch (error) {
        logger.error('Failed to get members', error as Error, {
            userId,
            ageRange,
            gender,
            orderBy,
            pageNumber,
            pageSize
        });
        throw error;
    }
}

export async function getMemberByUserId(userId: string) {
    try {
        return await prisma.member.findUnique({ 
            where: { userId },
            select: {
                id: true,
                userId: true,
                name: true,
                image: true,
                gender: true,
                dateOfBirth: true,
                city: true,
                country: true,
                description: true,
                created: true,
                updated: true
            }
        });
    } catch (error) {
        logger.error('Failed to get member by userId', error as Error, { userId });
        throw error;
    }
}

export async function getMemberPhotosByUserId(userId: string) {
    const currentUserId = await getAuthUserId();

    const member = await prisma.member.findUnique({
        where: { userId },
        select: { photos: { where: currentUserId === userId ? {} : { isApproved: true } } }
    });

    if (!member) return null;

    return member.photos.map(p => p) as Photo[];
}

export async function updateLastActive() {
    const userId = await getAuthUserId();

    try {
        return prisma.member.update({
            where: { userId },
            data: { updated: new Date() }
        })
    } catch (error) {
        logger.error('Failed to update last active', error as Error, { userId });
        throw error;
    }
}