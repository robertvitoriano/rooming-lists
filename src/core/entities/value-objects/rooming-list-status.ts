export type IRoomingListStatus = 'active' | 'closed' | 'cancelled';

export class RoomingListStatus {
  private static readonly allowedStatuses: IRoomingListStatus[] = ['active', 'closed', 'cancelled'];

  private constructor(private readonly value: IRoomingListStatus) {}

  public static create(status: string): RoomingListStatus {
    if (!RoomingListStatus.allowedStatuses.includes(status as IRoomingListStatus)) {
      throw new Error(`Invalid RoomingListStatus: "${status}"`);
    }
    return new RoomingListStatus(status as IRoomingListStatus);
  }

  public toValue(): string {
    return this.value;
  }

  public static ACTIVE = new RoomingListStatus('active');
  public static CLOSED = new RoomingListStatus('closed');
  public static CANCELLED = new RoomingListStatus('cancelled');
}
