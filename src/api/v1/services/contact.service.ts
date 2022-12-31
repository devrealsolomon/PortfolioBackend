import { NewContact, IContact } from '../interfaces/contact.interface';
import Contact from '../models/contact.model';
import createError from 'http-errors';
import { PaginateOptions, PaginateResult } from 'mongoose';

export const fetchPaginatedContacts = (
    page: number,
    perPage: number,
): Promise<PaginateResult<IContact & { _id: string }>> => {
    return new Promise<PaginateResult<IContact & { _id: string }>>(async (resolve, reject) => {
        const paginationOptions: PaginateOptions = {
            sort: { created_at: -1 },
            page,
            limit: perPage,
            customLabels: {
                limit: 'perPage',
            },
        };

        try {
            const paginatedContacts = await Contact.paginate({}, paginationOptions);
            resolve(paginatedContacts);
        } catch (err) {
            reject(err);
        }
    });
};

export const saveContactToDb = (contact: NewContact): Promise<IContact & { _id: string }> => {
    return new Promise<IContact & { _id: string }>(async (resolve, reject) => {
        try {
            const newContact = new Contact(contact);
            const savedContact = newContact.save();
            resolve(savedContact);
        } catch (err) {
            reject(err);
        }
    });
};

export const removeContactFromDb = (contactId: string): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            const contact = await Contact.findById(contactId);
            if (contact) {
                await contact.remove();
                resolve(true);
            } else {
                reject(new createError.NotFound('Contact with id could not be found'));
            }
        } catch (err) {
            reject(err);
        }
    });
};
