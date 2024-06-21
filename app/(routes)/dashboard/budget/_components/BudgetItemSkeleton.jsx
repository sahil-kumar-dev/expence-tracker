import Skeleton from "react-loading-skeleton"

export const BudgetItemSkeleton = () => {
    return (
        <div className='p-5 border rounded-lg '>
            <div className=" w-full">
                <Skeleton height={50} width={50} borderRadius={100} />
                <div className="mt-5">
                    <Skeleton width={100} />
                    <Skeleton />
                </div>
            </div>
        </div>
    )
}