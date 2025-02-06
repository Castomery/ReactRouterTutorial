export type Van = {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    type: string;
};

export type HostVans = Van & {
    hostId: string;
}