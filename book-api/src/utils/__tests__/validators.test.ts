import { isValidUUID } from '../validators';

describe('Validators', () => {
    describe('isValidUUID', () => {
        it('should return true for valid UUID', () => {
            expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
        });

        it('should return false for invalid UUID', () => {
            expect(isValidUUID('invalid-uuid')).toBe(false);
            expect(isValidUUID('123')).toBe(false);
            expect(isValidUUID('')).toBe(false);
        });
    });
});