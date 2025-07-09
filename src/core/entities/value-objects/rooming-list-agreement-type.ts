export type IRoomingListAgreementType = 'leisure' | 'staff' | 'artist';

export class RoomingListAgreementType {
  private static readonly allowedAgreementTypes: IRoomingListAgreementType[] = [
    'leisure',
    'staff',
    'artist',
  ];

  private constructor(private readonly value: IRoomingListAgreementType) {}

  public static create(agreementType: string): RoomingListAgreementType {
    if (
      !RoomingListAgreementType.allowedAgreementTypes.includes(
        agreementType as IRoomingListAgreementType,
      )
    ) {
      throw new Error(`Invalid RoomingListAgreementType : "${agreementType}"`);
    }
    return new RoomingListAgreementType(
      agreementType as IRoomingListAgreementType,
    );
  }

  public toValue(): string {
    return this.value;
  }

  public static LEISURE = new RoomingListAgreementType('leisure');
  public static STAFF = new RoomingListAgreementType('staff');
  public static ARTIST = new RoomingListAgreementType('artist');
}
