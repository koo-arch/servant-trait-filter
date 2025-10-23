'use client'
import React from 'react';
import Image from 'next/image';
import { useAtomValue } from 'jotai';
import { useSearchServants } from '../../hooks/useSearchServants';
import { mastersAtom } from '@/atoms/queries/master';
import type { Class } from '@/types/master';
import type { Servant } from '@/types/servant';

function classSymbol(classId: number): string {
    return `https://static.atlasacademy.io/JP/ClassIcons/class3_${classId}.png`
}

function groupByClass(servants: Servant[]): Map<number, Servant[]> {
    const classMap = new Map<number, Servant[]>();
    for (const s of servants) {
        const arr = classMap.get(s.classId)
        if (arr) arr.push(s);
        else classMap.set(s.classId, [s])
    }
    return classMap
}

const ServantClassSections: React.FC = () => {
    const { servants, isLoading, error } = useSearchServants();
    const { class: classes }  = useAtomValue(mastersAtom)

    const grouped = React.useMemo(
        () => groupByClass(servants?.items ?? []),
        [servants?.items]
    )

    if (isLoading) return <div>loading...</div>
    if (error) return <div>{error.message}</div>


    return (
        <div>
            {classes.map(c => {
                const classList = grouped.get(c.id) ?? []
                if (classList.length === 0) return null;
                return (
                    <section key={c.id} className="flex mb-6">
                        <div className="shrink-0 w-16 flex items-center justify-center">
                            <Image src={classSymbol(c.id)} alt={c.name} width={50} height={50} />
                        </div>
                        <div className="min-w-0 flex-1 flex flex-wrap gap-4 p-4 bg-white rounded shadow">
                            {classList.map(sv => (
                                <div key={sv.id}>
                                    <Image src={sv.face} alt={sv.name} width={50} height={50} />
                                </div>
                            ))}
                        </div>
                    </section>
                )
            })}
        </div>
    )
}

export default ServantClassSections;