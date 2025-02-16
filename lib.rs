[04:58, 2/15/2025] EMMANUEL OGBUAGU: use solana_program::{
    account_info::{AccountInfo},
    entrypoint::{ProgramResult},
    entrypoint::entrypoint,
    pubkey::Pubkey,
    msg,
    system_instruction,
    sysvar::{rent::Rent, Sysvar},
};

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,   // The program id to be invoked
    accounts: &[AccountInfo], // List of accounts involved in the transaction
    _instruction_data: &[u8], // Instruction data (optional)
) -> ProgramResult {
    msg!("Solana Counter program invoked");

    // Check if the first account is the system program account (used to create new accounts)
    let rent = &Rent::from_account_info(&accounts[0])?;

    // Check if the account has enough balance
    if rent.is_exempt(accounts[0].la…
[06:16, 2/15/2025] EMMANUEL OGBUAGU: C:\Users\LENOVO\Downloads\solana-release-x86_64-pc-windows-msvc\solana-release\bin
[06:44, 2/15/2025] EMMANUEL OGBUAGU: use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
};

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;

    msg!("Hello, Solana!");

    // Increase the value of the account's data (simple counter)
    let mut data = &mut account.try_borrow_mut_data()?;
    let counter = data[0] as u64;  // Read the first byte as the counter
    data[0] = (counter + 1) as u8;  // Increment the counter

    msg!("Counter value: {}", counter + 1);

    Ok(())
}